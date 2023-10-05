const Employee = require('./employee');

// # Phase 2: Define the `Manager` class that extends `Employee`

// With your `Employee` module behaving as expected you can now move on to your
// `Manager` module.

// ## Instructions

// In this phase you will create a `Manager` class that inherits from the
// `Employee` class you just made. Run the test specs using
// `npm test test/02-create-manager-spec.js`. Once the specs pass, use the local
// tests provided below to see your app in action.

// Begin by creating a __manager.js__ file and requiring your `Employee` module.
// Next, you will define your `Manager` class as a child of the `Employee` class
// that inherits all of the same properties.

// > **Note**: A `Manager` may be under another `Manager` because
// >`Manager`s might report to higher-level `Manager`s.

// You will need an additional `employees` property that holds an array of all
// `Employee`s assigned to the `Manager`.


// If you run the following in node:
// ```js
// const splinter = new Manager('Splinter', 100000, 'Sensei');
// console.log(splinter);
// ```

// You should see something like this:
// ```bash
// Manager {
//   name: 'Splinter',
//   salary: 100000,
//   title: 'Sensei',
//   manager: null,
//   employees: []
// }
// ```

// Create an instance method named `addEmployee(employee)`. This method should add
// an `Employee` instance to a `Manager` instance's `employees` array.

// In addition to passing the test specs, you should set up some more local tests
// to ensure your method is working properly.

// ```js
// const splinter = new Manager('Splinter', 100000, 'Sensai');
// console.log('Before: ', splinter);

// const leo = new Employee('Leonardo', 90000, 'Ninja', splinter);
// const mikey = new Employee('Michelangelo', 90000, 'Ninja', splinter);
// const donnie = new Employee('Donatello', 90000, 'Ninja', splinter);
// const raph = new Employee('Raphael', 90000, 'Ninja', splinter);

// splinter.addEmployee(leo);
// splinter.addEmployee(mikey);
// splinter.addEmployee(donnie);
// splinter.addEmployee(raph);

// console.log('After: ', splinter);
// ```

// When you run the above code, your terminal output should look something like
// this:

// ```bash
// Before:  Manager {
//   name: 'Splinter',
//   salary: 100000,
//   title: 'Sensei',
//   manager: null,
//   employees: []
// }


// After:  Manager {
//   name: 'Splinter',
//   salary: 100000,
//   title: 'Sensei',
//   manager: null,
//   employees: [
//     Employee {
//       name: 'Leonardo',
//       salary: 90000,
//       title: 'Ninja',
//       manager: [Circular]
//     },
//     Employee {
//       name: 'Michelangelo',
//       salary: 90000,
//       title: 'Ninja',
//       manager: [Circular]
//     },
//     Employee {
//       name: 'Donatello',
//       salary: 90000,
//       title: 'Ninja',
//       manager: [Circular]
//     },
//     Employee {
//       name: 'Raphael',
//       salary: 90000,
//       title: 'Ninja',
//       manager: [Circular]
//     }
//   ]
// }
// ```
// >__Note:__ _The `[Circular]` value you see attached to the `manager` key is just
// >a cleaner way of saying that the `manager` key points back to the `Manager` you
// >are currently looking at._

// So your method works, but it would be a little painstaking to manually create
// each `Employee` and then add them to their prospective`Manager`'s `employees`
// list.

// In the next phase, you will tackle handling this task dynamically. You will
// refactor your code so that when you instantiate an `Employee`, they will add
// themselves to their `Manager`'s `employees` list.



// To calculate a `Manager`'s bonus you must sum the salaries of each `employee`
// in their `employees` array. You must also take into account whether each
// `employee` is an instance of an `Employee`, in which case simply add their
// `salary` to a sum. If they are a `Manager` you must then process each of their
// employees, and so on.

// The the repetitive nature of this problem suggests that a recursive solution
// might be appropriate. You should extract this logic into a helper function
// named `_totalSubSalary()`. The `_` ahead of the method name is an indication
// to other developers that this method is "private" and should only
// be used as a helper.

// Inside of `_totalSubSalary()`, create a sum variable. Check to see if each
// `employee` is an instance of `Manager`. If so, add their `salary` plus a
// recursive call to their `_totalSubSalary()` to sum. If not, simply add
// their `salary` to sum.

// The `calculateBonus` logic should look something like this:

// ```plaintext
// bonus = (manager's salary + total salary of all employees under them)
//  * multiplier
// ```
function _totalSubSalary(employee){
    let sum = 0;
    if(employee instanceof Manager){
        sum += employee.salary;
        employee.employees.forEach(subEmployee => {
            sum += _totalSubSalary(subEmployee);
        })
    } else {
        sum += employee.salary;
    }

    return sum;
}

class Manager extends Employee{
    constructor(name, salary, title, manager=null, employees=[]){
        super(name, salary, title, manager);
        this.employees = employees;
    }

    addEmployee(employee){
        this.employees.push(employee);
    }

    calculateBonus(multipler){
        let bonus = this.salary;
        bonus += this._totalSubSalary()
        return bonus * multipler
    }

    _totalSubSalary(){
        let sum = 0;
        this.employees.forEach(employee => {
            if(employee instanceof Manager){
                sum += employee.salary;
                sum += employee._totalSubSalary(employee.employees)
            } else {
                sum += employee.salary;
            }
        })
        return sum;
    }
}

const splinter = new Manager('Splinter', 100000, 'Sensei');
const leo = new Manager('Leonardo', 90000, 'Ninja', splinter);
const raph = new Manager('Raphael', 90000, 'Ninja', leo);
const mikey = new Employee('Michelangelo', 85000, 'Grasshopper', raph);
const donnie = new Employee('Donatello', 85000, 'Grasshopper', raph);

console.log(splinter.calculateBonus(0.05)); // => 22500
console.log(leo.calculateBonus(0.05)); // => 17500
console.log(raph.calculateBonus(0.05)); // => 13000

module.exports = Manager;
