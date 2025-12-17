
//Creating Objects
let CourseInfo = {
                    "id": Number,
                    "name": String,
                 };

let AssignmentGroup = {
                        "id": Number,
                        "name": String,
                        "course_id": Number,
                        "group_weight": Number,
                        "assignments": [AssignmentInfo],
                      };

let AssignmentInfo = {
                        "id": Number,
                        "name": String,
                        //the due date for the assignment
                        "due_at": String,
                        //the maximum points possible for the assignment
                        "points_possible": Number,

                     };

let LearnerSubmission = {
                            "learner_id": Number,
                            "assignment_id": Number,
                            "submission": {
                                "submitted_at": String,
                                "score": Number
                            },
                        };

function getLearnerID(LearnerSubmission) {
    let learnerID = LearnerSubmission.learner_id;

    return {learner_ID: learnerID};
}

//return an array of objects of learner assignments with 
//filter for assignments where due_at is after before date_current
//function should return all valid assignments
function getAllLearnerAssignments(learnerID, learnerSubmissions, assignmentGroup) {
    const assignments = [];
    const currentDate = new Date();

    for (const submission of learnerSubmissions) {
        //filter by learner
        if (submission.learner_id !== learnerID) {
            continue;
        }

        //search for assignments that match learner assignments
        const assignment = assignmentGroup.assignments.find(
            a => a.id === submission.assignment_id
        );


        if (!assignment) {
            continue;
        } 

        const dueDate = new Date(assignment.due_at);
        
        //ignore assignments that are not due yet
        if (dueDate > currentDate) {
            continue;
        }

        //Add valid assignments to the array of objects
        assignments.push({
            assignmentID: assignment.id,
            submissionInfo: submission.submission,
            pointsPossible: assignment.points_possible,
            dueAt: assignment.due_at
        });
    }

    return assignments;
}


//Return array of objects with assignment names and points scored 
function getAssignmentScores(assignments) {
    let assignmentsArray = [];
    for(let i = 0; i < assignments.length; i++) {
        assignmentsArray.push({
            assignment_ID: assignments[i].assignmentID,
            assignmentScore: assignments[i].submissionInfo["score"],
        })
    }

    return assignmentsArray;

}



function getAssignmentAverage(assigments) {
    let totalPoints = 0;
    let totalScore = 0;
    for (let i = 0; i < assigments.length; i++) {
        let pointsPossible = assigments[i].pointsPossible;
        let pointsScored = assigments[i].submissionInfo["score"];
        let dateSubmitted = new Date (assigments[i].submissionInfo["submitted_at"]);
        let dueDate = new Date(assigments[i].dueAt);
        
        if(assigments[i].pointsPossible <= 0) {
            throw new Error("Points possible must be greater than zero.");
        } 
            
        let finalScore = pointsScored;

        if(dateSubmitted > dueDate) {
            finalScore -= pointsPossible * 0.1;
        } 
            
        totalPoints += pointsPossible;
        totalScore += Math.max(finalScore, 0);
        
    }

    return totalScore / totalPoints;
}

function getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmission) {
    let res =  
    if (assignmentGroup.course_id !== courseInfo.id) {
        throw new Error("AssignmentGroup does not belong to this course.");
     }

     try {
        let learnerID = getLearnerID(LearnerSubmission.learner_id);
     } catch (error) {
        console.error(error);
     }

     try {
        let learnerAssignments = getAllLearnerAssignments(learnerID, LearnerSubmission, AssignmentGroup);
     } catch (error) {
        console.error(error);
     }

     try {
        let assigmentsAvg = getAssignmentAverage(learnerAssignments);
     } catch (error) {
        console.error(error);
     }
}