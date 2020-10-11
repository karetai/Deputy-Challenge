/*
Requirements for solution:
Roles are defined positions given to users, each role has a superior parent role and a number ID.
The code must function with an arbitrary amount of roles or users.
There is a master administrator role at the top that has no parent. This roles ID can be 1, with its parent defined as 0(No parent)
Must find ALL subordinate users(Any user with a role that is a child of the selected users role, and all further children down the chain), when given a users ID.
Must be a single function that when called will provide the list of users.
Roles and users can be assumed to be in lists of objects representing roles and users beforehand, and may be called to initialise things.
*/

//When roles have been set, use function to create a new list of objects that has every role ID connected to every subordinate role
/*
How setRolesChildren function works:
Loops through list of every role, adding the role ID as a property identifier/name of an object.
While on a role, another loop runs through every role and adds all roles that are children to a list that will be the object property value.
*/
const setRolesChildren = function(rolesList) {
  let rolesAndChildren = {};
  for (let i = 0; i < rolesList.length; i++) {
    let role = rolesList[i]; //grabs role object from list
    rolesAndChildren[role.id] = [] //applies role as object name
    for (let k = 0; k < rolesList.length; k++) { //begins loop to find all children
      if (rolesList[k].parent == role.id) {
        rolesAndChildren[role.id].push(rolesList[k].id) //pushes child id into parent object list
      }
    }
  }
  return rolesAndChildren;
}

//the lists will be looped through for each role finding the descendants of each child. All descendants will be added to the roles list.
const setRolesDescendants = function(rolesAndChildren) {
  for (let workingRole in rolesAndChildren) { //acquires object property name
    if(rolesAndChildren[workingRole].length >= 1){ //Determines if the role has children
      for (let i = 0; i < rolesAndChildren[workingRole].length; i++) {
        let subRolesList = rolesAndChildren[rolesAndChildren[workingRole][i]];
        subRolesList.forEach((childRole)=> {if(!(rolesAndChildren[workingRole].includes(childRole))) {
          rolesAndChildren[workingRole].push(childRole);
        }})
      }
    }
  }
  return rolesAndChildren;
}

//When the search function is called, it will find the user and get its role ID. It will then find every user that is subordiante to that roll.
const getSubordinates = function(selectedUserId, usersList) {
  let topRole;
  let subordinates = [];
  for(let i = 0; i < usersList.length; i++) {
    if (usersList[i].id == selectedUserId) {
      topRole = usersList[i].role;
      break;
    }
  }
  for (let i = 0; i < usersList.length; i++) {
    if (orderedRoles[topRole].includes(usersList[i].role)) {
      subordinates.push(usersList[i]);
    }
  }
  return subordinates;
}

//Testing
let roles = [{
    "id": 1,
    "parent": 0
  },{
    "id": 2,
    "parent": 1
  },{
    "id": 3,
    "parent": 1
  },{
    "id": 4,
    "parent": 3
  },{
    "id": 5,
    "parent": 3
  },{
    "id": 6,
    "parent": 4
  },{
    "id": 7,
    "parent": 4
  },{
    "id": 8,
    "parent": 5
  },
]

let users = [
{
"id": 1,
"name": "Adam Admin",
"role": 1
},
{
"id": 2,
"name": "Emily Employee",
"role": 4
},
{
"id": 3,
"name": "Sam Supervisor",
"role": 3
},
{
"id": 4,
"name": "Mary Manager",
"role": 2
},
{
"id": 5,
"name": "Steve Trainer",
"role": 5
}
]
//must be called first to allow object to be used in getSubordinates function
const orderedRoles = setRolesDescendants(setRolesChildren(roles));
console.log(orderedRoles);

const subordinatesListTest = getSubordinates(1, users);
console.log(subordinatesListTest);

const secondSubordinatesListTest = getSubordinates(3, users);
console.log(secondSubordinatesListTest);
