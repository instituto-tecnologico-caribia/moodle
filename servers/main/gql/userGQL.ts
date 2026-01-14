import { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLInputObjectType } from "graphql";
import { MoodleController } from "@/controllers";

export class UserGQL {
    private CreateUserInput = new GraphQLInputObjectType({
        name: "UserInput",
        fields: {
            createPassword: { type: GraphQLString },
            username: { type: new GraphQLNonNull(GraphQLString) },
            password: { type: new GraphQLNonNull(GraphQLString) },
            firstName: { type: new GraphQLNonNull(GraphQLString) },
            lastName: { type: new GraphQLNonNull(GraphQLString) },
            email: { type: new GraphQLNonNull(GraphQLString) },
            idNumber: { type: GraphQLString },
            city: { type: GraphQLString },
            country: { type: GraphQLString },
            phone: { type: GraphQLString },
            auth: { type: GraphQLString },
            mailDisplay: { type: GraphQLString },
            timeZone: { type: GraphQLString },
            description: { type: GraphQLString },
            firstNamePhonetic: { type: GraphQLString },
            lastNamePhonetic: { type: GraphQLString },
            middleName: { type: GraphQLString },
            alternateName: { type: GraphQLString },
            interests: { type: GraphQLString },
            institution: { type: GraphQLString },
            department: { type: GraphQLString },
            address: { type: GraphQLString },
            language: { type: GraphQLString },
            calendarType: { type: GraphQLString },
            theme: { type: GraphQLString },
            mailFormat: { type: GraphQLString },
            customFields: {
                type: new GraphQLInputObjectType({
                    name: "CustomFieldsInput",
                    fields: {
                        type: { type: GraphQLString },
                        value: { type: GraphQLString },
                    },
                }),
            },
            preferences: {
                type: new GraphQLInputObjectType({
                    name: "PreferencesInput",
                    fields: {
                        type: { type: GraphQLString },
                        value: { type: GraphQLString },
                    },
                }),
            },
        },
    });

    private CreateCourseInput = new GraphQLInputObjectType({
        name: "CourseInput",
        fields: {
            fullName: { type: new GraphQLNonNull(GraphQLString) },
            shortName: { type: new GraphQLNonNull(GraphQLString) },
            categoryId: { type: new GraphQLNonNull(GraphQLInt) },
            idNumber: { type: GraphQLString },
            summary: { type: GraphQLString },
            summaryFormat: { type: GraphQLInt },
            format: { type: GraphQLString },
            showGrades: { type: GraphQLInt },
            newsItems: { type: GraphQLInt },
            startDate: { type: GraphQLInt },
            endDate: { type: GraphQLInt },
            numSections: { type: GraphQLInt },
            maxBytes: { type: GraphQLInt },
            showReports: { type: GraphQLInt },
            visible: { type: GraphQLInt },
            hiddenSections: { type: GraphQLInt },
            groupMode: { type: GraphQLInt },
            groupModeForce: { type: GraphQLInt },
            defaultGroupingId: { type: GraphQLInt },
            enableCompletion: { type: GraphQLInt },
            completionNotify: { type: GraphQLInt },
            language: { type: GraphQLString },
            forceTheme: { type: GraphQLString },

            courseFormatOptions: {
                type: new GraphQLList(
                    new GraphQLInputObjectType({
                        name: "CourseFormatOptionInput",
                        fields: {
                            name: { type: GraphQLString },
                            value: { type: GraphQLString },
                        },
                    })
                ),
            },

            customFields: {
                type: new GraphQLList(
                    new GraphQLInputObjectType({
                        name: "CustomFieldInput",
                        fields: {
                            shortName: { type: GraphQLString },
                            value: { type: GraphQLString },
                        },
                    })
                ),
            },
        },
    });


    private createUser = () => ({
        type: new GraphQLObjectType({
            name: "User",
            fields: {
                id: { type: GraphQLInt },
                username: { type: GraphQLString }
            }
        }),
        args: {
            data: {
                type: new GraphQLNonNull(
                    this.CreateUserInput
                )
            }
        },
        resolve: MoodleController.createUser
    });

    public readonly mutations = {
        createUser: this.createUser()
    };

    public readonly queries = {
        test: {
            type: GraphQLString,
            resolve: () => "test"
        }
    };
}


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