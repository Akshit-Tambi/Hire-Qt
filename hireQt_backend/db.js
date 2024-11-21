const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Connect to MongoDB
mongoose.connect("mongodb+srv://21ucs015:jkhdtjz0@cluster0.o6ql4ux.mongodb.net/hireQt");


const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50,
    },
    lastname: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50,
    },    
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30,
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
    },
})

// Add method to hash the password
userSchema.methods.createHash = async function (plainTextPassword) {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(plainTextPassword, salt);
};

// Add method to validate the password
userSchema.methods.validatePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);

/*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*/
// Custom validator for Indian phone numbers
const phoneValidator = {
  validator: function(v) {
    // This regex validates:
    // - Optional +91 or 91 prefix
    // - 10 digits where first digit must be 6, 7, 8, or 9
    // - Allows optional spaces or hyphens between numbers
    return /^(?:(?:\+|91)?[-\s]?)?[6789]\d{9}$/.test(v);
  },
  message: 'Please enter a valid Indian phone number (10 digits starting with 6, 7, 8, or 9)'
};

// Custom validator for URLs
const urlValidator = {
  validator: function(v) {
    return /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(v);
  },
  message: 'Please enter a valid URL'
};

const UserResume = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  resumeUrl: {
    type: String
  },
  basicInformation: {
    firstName: {
      type: String,
      required: true,
      trim: true
    },
    lastName: {
      type: String,
      required: true,
      trim: true
    },
    fullName: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },
    phoneNumber: {
      type: String,
      required: true,
      validate: phoneValidator
    },
    location: {
      type: String,
      required: true,
      trim: true
    },
    portfolioUrl: {
      type: String,
      validate: urlValidator
    },
    linkedinUrl: {
      type: String,
      validate: urlValidator
    },
    githubUrl: {
      type: String,
      validate: urlValidator
    }
  },
  education: [{
    university: {
      type: String,
      required: true,
      trim: true
    },
    educationLevel: {
      type: String,
      required: true,
      enum: ['Associate', 'Bachelor', 'Master', 'PhD', 'Other'],
      trim: true
    },
    graduationYear: {
      type: Number,
      required: true,
      min: 1900,
      max: 2100
    },
    graduationMonth: {
      type: String,
      required: true,
      enum: ['January', 'February', 'March', 'April', 'May', 'June', 
             'July', 'August', 'September', 'October', 'November', 'December']
    },
    majors: [{
      type: String,
      required: true,
      trim: true
    }],
    gpa: {
      type: Number,
      min: 0,
      max: 4.0,
      required: true
    }
  }],
  jobExperience: [{
    jobTitle: {
      type: String,
      required: true,
      trim: true
    },
    company: {
      type: String,
      required: true,
      trim: true
    },
    location: {
      type: String,
      required: true,
      trim: true
    },
    duration: {
      startDate: {
        type: Date,
        required: true
      },
      endDate: {
        type: Date
      },
      isCurrentJob: {
        type: Boolean,
        default: false
      }
    },
    jobContent: [{
      type: String,
      required: true,
      trim: true
    }]
  }],
  projectExperience: [{
    projectName: {
      type: String,
      required: true,
      trim: true
    },
    projectDescription: {
      type: String,
      required: true,
      trim: true
    },
    technologies: [{
      type: String,
      trim: true
    }],
    projectUrl: {
      type: String,
      validate: urlValidator
    },
    startDate: {
      type: Date
    },
    endDate: {
      type: Date
    }
  }],
  preferences: {
    jobTypes: [{
      type: String,
      trim: true
    }],
    locations: [{
      type: String,
      trim: true
    }],
    industries: [{
      type: String,
      trim: true
    }]
  }
}, {
  timestamps: true
});

// Indexes for frequent queries
UserResume.index({ userId: 1 });
UserResume.index({ 'basicInformation.email': 1 });
UserResume.index({ 'basicInformation.fullName': 1 });
UserResume.index({ 'education.university': 1 });
UserResume.index({ 'jobExperience.company': 1 });
UserResume.index({ 'projectExperience.projectName': 1 });

// Pre-save middleware to construct fullName
UserResume.pre('save', function(next) {
  if (this.basicInformation.firstName || this.basicInformation.lastName) {
    this.basicInformation.fullName = `${this.basicInformation.firstName} ${this.basicInformation.lastName}`.trim();
  }
  next();
});

const UserProfile = mongoose.model('UserProfile', UserResume);

///////////////////////////////////////////////////////



const arrayLengthValidators = {
    jobProfiles: {
        validator: function(arr) {
            return arr.length <= 3;
        },
        message: 'You can select up to 3 job profiles only'
    },
    skills: {
        validator: function(arr) {
            return arr.length <= 15;
        },
        message: 'You can select up to 15 skills only'
    },
    locations: {
        validator: function(arr) {
            return arr.length <= 3;
        },
        message: 'You can select up to 3 preferred locations only'
    }
};

const JobPreferencesSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User ID is required'],
        unique: true
    },
    jobProfiles: {
        type: [{
            type: String,
            trim: true,
            lowercase: true
        }],
        validate: arrayLengthValidators.jobProfiles,
        required: [true, 'At least one job profile is required']
    },
    skills: {
        type: [{
            name: {
                type: String,
                trim: true,
                required: true
            }
        }],
        validate: arrayLengthValidators.skills,
        required: [true, 'At least one skill is required']
    },
    preferredLocations: {
        type: [{
            city: {
                type: String,
                required: true,
                trim: true
            },    
        }],
        validate: arrayLengthValidators.locations,
        required: [true, 'At least one preferred location is required']
    },
    academicDetails: {
        cgpa: {
            type: Number,
            required: true,
            min: [0, 'CGPA cannot be less than 0'],
            max: [10, 'CGPA cannot be more than 10'],
            validate: {
                validator: function(v) {
                    return Number.isFinite(v) && v >= 0 && v <= 10;
                },
                message: props => `${props.value} is not a valid CGPA!`
            }
        },
        graduationYear: {
            type: Number,
            required: true,
            min: [1900, 'Invalid graduation year'],
            max: [2100, 'Invalid graduation year'],
            validate: {
                validator: function(v) {
                    return Number.isInteger(v);
                },
                message: props => `${props.value} is not a valid year!`
            }
        }
    },
    additionalPreferences: {
        
        experienceLevel: {
            type: String,
            enum: ['Fresher' , 'Entry-Level' , 'Experienced'],
            default: 'Fresher'
        },
        workplaceType: {
            type: String,
            enum: ['Remote', 'Hybrid', 'On-site'],
            default: 'On-site'
        },
        willingToRelocate: {
            type: Boolean,
            default: true
        }
    }
}, {
    timestamps: true
});
// Indexes for better query performance
JobPreferencesSchema.index({ userId: 1 });
JobPreferencesSchema.index({ 'academicDetails.graduationYear': 1 });
JobPreferencesSchema.index({ 'skills.name': 1 });
JobPreferencesSchema.index({ jobProfiles: 1 });

// Method to check if preferences are complete
JobPreferencesSchema.methods.isComplete = function() {
    return (
        this.jobProfiles.length > 0 &&
        this.skills.length > 0 &&
        this.preferredLocations.length > 0 &&
        this.academicDetails.cgpa !== undefined &&
        this.academicDetails.graduationYear !== undefined
    );
};

// Pre-save middleware to validate arrays length
JobPreferencesSchema.pre('save', function(next) {
    if (this.jobProfiles.length > 3) {
        next(new Error('Maximum 3 job profiles allowed'));
    }
    if (this.skills.length > 15) {
        next(new Error('Maximum 15 skills allowed'));
    }
    if (this.preferredLocations.length > 3) {
        next(new Error('Maximum 3 preferred locations allowed'));
    }
    next();
});

const JobPreferences = mongoose.model('JobPreferences', JobPreferencesSchema);

module.exports = {
    User,
    UserProfile,
    JobPreferences
};