// Imagine you have a company structured like this:

// | Name     | Salary  | Title      | Boss   |
// | -------- | ------- | ---------- | ------ |
// | Hobbes   | 1000000 | Founder    | null   |
// | Calvin   | 130000  | Director   | Hobbes |
// | Susie    | 100000  | TA Manager | Calvin |
// | Lily     | 90000   | TA         | Susie  |
// | Clifford | 90000   | TA         | Susie  |

// If Hobbes gets a bonus multiplier of 0.05, their bonus will be $70,500.

// If Calvin gets a bonus multiplier of 0.05, their bonus will be $20,500.

// If Susie gets a bonus multiplier of 0.05, their bonus will be $14,000.

// If Lily gets a bonus multiplier of 0.05, their bonus will be $4,500.

// If Clifford gets a bonus multiplier of 0.05, their bonus will be $4,500.

// Create a new file called __test.js__. Create the scenario above and make sure
// you get the correct bonuses for each employee.

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

const hobbes = new Manager("Hobbes", 1000000, "Founder")
const calvin = new Manager("Calvin", 130000, "Director", hobbes)
const susie = new Manager("Susie", 100000, "TA Manager", calvin)
const lily = new Employee("Lily", 90000, "TA", susie)
const clifford = new Employee("Clifford", 90000, "TA", susie);

console.log(clifford.calculateBonus(0.05));
console.log(lily.calculateBonus(0.05));
console.log(susie.calculateBonus(0.05));
console.log(calvin.calculateBonus(0.05));
console.log(hobbes.calculateBonus(0.05));
