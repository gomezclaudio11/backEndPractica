class Employee {
    speak () {
        return "Hi, i'm a " + this.tipe + "employee"
    }
}

class FullTimeEmployee extends Employee {
    constructor (data) {
        super ()
        this.type = "fulltime"
    }
}

class PartTimeEmployee extends Employee {
    constructor (data) {
        super ()
        this.type = "parttime"
    }
}

class ContractorEmployee extends Employee {
    constructor (data) {
        super ()
        this.type = "contractor"
    }
}

class MyEmployeeFactory {
    createEmployee (data) {
        if(data.type == "fulltime") return new FullTimeEmployee(data)
        if(data.type == "parttime") return new PartTimeEmployee(data)
        if(data.type == "contractor") return new ContractorEmployee(data)
    }
}

let factory = new MyEmployeeFactory()

let types = ["fulltime", "parttime", "contractor"]
let employees = []

for (let i= 0; i < 100; i++ ) {
    employees.push(factory.createEmployee({type: types[Math.floor (( Math.random(2) *2 ))]}))
}

employees.forEach ( e => {
    console.log(e.speak());
}

)