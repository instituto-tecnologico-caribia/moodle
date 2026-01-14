import { z } from "zod";

// [{"id":6,"username":"fakeuser1"}]



class MoodleUsersZodSchemas {
    static readonly CoreUserGetUsers = z.object({
        "users[0][idnumber]": z.string().optional(),
        "users[0][username]": z.string().optional()
    })


    static readonly CoreUserCreateUserResponse = z.object({
        id: z.number(),
        username: z.string(),
    })



    static readonly CoreUserCreateUsers = z.object({
        createPassword: z.string().regex(/^[01]$/).optional(),
        username: z.string(),
        password: z.string()
            .min(8, "Password must be at least 8 characters long")
            .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
            .regex(/[a-z]/, "Password must contain at least one lowercase letter")
            .regex(/[0-9]/, "Password must contain at least one number")
            .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
        firstName: z.string(),
        lastName: z.string(),
        email: z.email(),
        idNumber: z.string(),
        city: z.string(),
        country: z.string(),
        phone: z.string(),
        auth: z.string().optional().transform((val) => val || "manual"),
        mailDisplay: z.string().optional(),
        timeZone: z.string().optional(),
        description: z.string().optional(),
        firstNamePhonetic: z.string().optional(),
        lastNamePhonetic: z.string().optional(),
        middleName: z.string().optional(),
        alternateName: z.string().optional(),
        interests: z.string().optional(),
        institution: z.string().optional(),
        department: z.string().optional(),
        address: z.string().optional(),
        language: z.string().optional(),
        calendarType: z.string().optional(),
        theme: z.string().optional(),
        mailFormat: z.string().optional(),
        customFields: z.object({
            type: z.string().optional(),
            value: z.string().optional(),
        }).optional(),

        preferences: z.object({
            type: z.string().optional(),
            value: z.string().optional(),
        }).optional(),
    })

    static CoreCourseCreateCoursesTransform = (data: z.infer<typeof MoodleUsersZodSchemas.CoreUserCreateUsers>) => {
        const mapped: Record<string, any> = {};
        for (const [key, value] of Object.entries(data)) {
            if (typeof value === "object" && !Array.isArray(value) && value !== null) {
                for (const [nestedKey, nestedValue] of Object.entries(value)) {
                    mapped[`users[0][${key}][${nestedKey}]`.toLowerCase()] = nestedValue;
                }
            } else {
                mapped[`users[0][${key === "language" ? "lang" : key}]`.toLowerCase()] = value;
            }
        }
        return mapped;
    }
    static readonly CoreCourseCreateCourses = z.object({
        fullName: z.string(),
        shortName: z.string(),
        categoryID: z.number(),
        idNumber: z.string(),
        summary: z.string().optional(),
        summaryFormat: z.number().optional(),
        format: z.string().optional(),
        showGrades: z.number().optional(),
        newsItems: z.number().optional(),
        startDate: z.number().optional(),
        endDate: z.number().optional(),
        numSections: z.number().optional(),
        maxBytes: z.number().optional(),
        showReports: z.number().optional().transform((val) => val || 1),
        visible: z.number().optional().transform((val) => val || 0),
        groupMode: z.number().optional(),
        groupModeForce: z.number().optional(),
        defaultGroupingID: z.number().optional(),
        enableCompletion: z.number().optional(),
        completionNotify: z.number().optional(),
        lang: z.string().optional(),
        forceTheme: z.string().optional(),
        courseFormatOptions: z.array(z.object({
            name: z.string(),
            value: z.string()
        })).optional(),
        customFields: z.array(z.object({
            type: z.string(),
            value: z.string()
        })).optional()
    }).transform((data) => {
        const mapped: Record<string, any> = {};
        for (const [key, value] of Object.entries(data)) {
            if (typeof value === "object" && !Array.isArray(value) && value !== null) {
                for (const [nestedKey, nestedValue] of Object.entries(value)) {
                    mapped[`courses[0][${key}][${nestedKey}]`] = nestedValue;
                }
            } else {
                mapped[`courses[0][${key}]`] = value;
            }
        }
        return mapped;
    })
}

export { MoodleUsersZodSchemas };

// courses[0][fullname]= string
// courses[0][shortname]= string
// courses[0][categoryid]= int
// courses[0][idnumber]= string
// courses[0][summary]= string
// courses[0][summaryformat]= int
// courses[0][format]= string
// courses[0][showgrades]= int
// courses[0][newsitems]= int
// courses[0][startdate]= int
// courses[0][enddate]= int
// courses[0][numsections]= int
// courses[0][maxbytes]= int
// courses[0][showreports]= int
// courses[0][visible]= int
// courses[0][hiddensections]= int
// courses[0][groupmode]= int
// courses[0][groupmodeforce]= int
// courses[0][defaultgroupingid]= int
// courses[0][enablecompletion]= int
// courses[0][completionnotify]= int
// courses[0][lang]= string
// courses[0][forcetheme]= string
// courses[0][courseformatoptions][0][name]= string
// courses[0][courseformatoptions][0][value]= string
// courses[0][customfields][0][shortname]= string
// courses[0][customfields][0][value]= string