
//Creating Objects
/*
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
*/

// The provided course information.
const CourseInfo = {
  id: 451,
  name: "Introduction to JavaScript"
};

// The provided assignment group.
const AssignmentGroup = {
  id: 12345,
  name: "Fundamentals of JavaScript",
  course_id: 451,
  group_weight: 25,
  assignments: [
    {
      id: 1,
      name: "Declare a Variable",
      due_at: "2023-01-25",
      points_possible: 50
    },
    {
      id: 2,
      name: "Write a Function",
      due_at: "2023-02-27",
      points_possible: 150
    },
    {
      id: 3,
      name: "Code the World",
      due_at: "3156-11-15",
      points_possible: 500
    }
  ]
};

// The provided learner submission data.
const LearnerSubmissions = [
  {
    learner_id: 125,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-25",
      score: 47
    }
  },
  {
    learner_id: 125,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-02-12",
      score: 150
    }
  },
  {
    learner_id: 125,
    assignment_id: 3,
    submission: {
      submitted_at: "2023-01-25",
      score: 400
    }
  },
  {
    learner_id: 132,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-24",
      score: 39
    }
  },
  {
    learner_id: 132,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-03-07",
      score: 140
    }
  }
];


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

function getAllLearnerIDs(submissions) {
    let learnerIDs = [];
    for (let submission of submissions) {
        //Check if learner id has already been added
        if (!learnerIDs.includes(submission.learner_id)) {
            learnerIDs.push(submission.learner_id);
        }
    }
    return learnerIDs;
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

function getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions) {
    // Validate course relationship
    if (AssignmentGroup.course_id !== CourseInfo.id) {
        throw new Error("AssignmentGroup does not belong to this course.");
    }
    const result = [];
    try {
        // Get all learner IDs
        const learnerIDs = getAllLearnerIDs(LearnerSubmissions);

        for (let learnerID of learnerIDs) {
            try {
                // Get all assignments for this learner
                const assignments = getAllLearnerAssignments(
                    learnerID,
                    LearnerSubmissions,
                    AssignmentGroup
                );
                // If learner has no valid assignments, skip
                if (assignments.length == 0) {
                    continue;
                }
                // Calculate  average
                const avg = getAssignmentAverage(assignments);
                // Build learner object
                let learnerObj = {
                    id: learnerID,
                    avg: avg
                };
                // Add assignment percentages
                for (const assignment of assignments) {
                    let avgScore = assignment.submissionInfo.score / assignment.pointsPossible;
                    learnerObj[assignment.assignmentID] = avgScore;
                }
                result.push(learnerObj);
            } catch (error) {
                console.error(error);
            }
        }

    } catch (error) {
        console.error(error);
    }
    return result;
}

console.log(getLearnerData(CourseInfo,AssignmentGroup,LearnerSubmissions));