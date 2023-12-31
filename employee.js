// Be sure that you are in the root of your project directory and create a new
// file named __employee.js__.

// In the __employee.js__ file, use the class keyword to define an `Employee`
// class with a constructor method that sets an `Employee`'s `name`, `salary`,
// `title`, and `manager` properties. Make sure the `manager` property will be set
// to `null` if no manager argument is passed in.

// Export your `Employee` class. Use the test specs to help guide you by running:
// ```
// npm test test/01-create-employee-spec.js
// ```

// Outside of your class definition you can set up some local testing to see what
// your `Employee` class looks like.

// ```js
// const leo = new Employee('Leonardo', 90000, 'Ninja');
// console.log(leo)
// ```


// When you place the snippet above in your code and run `node employee.js` in
// your terminal you should see something like this:

// ```bash
// Employee {
//     name: 'Leonardo',
//     salary: 90000,
//     title: 'Ninja',
//     manager: null
// }
// ```

// Notice that you didn't pass anything to the `manager` argument. You still need
// to create a `Manager` class.

// Move on to Phase 2 when you're ready!

class Employee{
    constructor(name, salary, title, manager=null){
        this.name = name;
        this.salary = salary;
        this.title = title;
        this.manager = manager;
        if (manager) {
            manager.addEmployee(this)
        }
    }

    calculateBonus(multiplier){
        let bonus = this.salary * multiplier;
        return bonus;
    }


}

// const raph = new Employee('Raphael', 90000, 'Ninja');
// const donny = new Employee('Donatello', 85000, 'Grasshopper');

// console.log(raph.calculateBonus(0.25)); // => 22500
// console.log(donny.calculateBonus(0.15)); // => 12750

module.exports = Employee;
