var personIndex = 1;
function Person(name, productivity, typeIndex) {
    this.tasksWorkingOn = [];
    this.productivityPerHour = 60;
    this.productivity = productivity;
    this.name = name;
    this.typeIndex = typeIndex;
    this.id = personIndex++;

    this.assignTo = function (task) {
        this.tasksWorkingOn.push(task);
        task.peopleAssigned.push(this);
    }

    this.unassignFromAll = function() {
        for (var i=0; i<this.tasksWorkingOn.length; i++) {
            var task = this.tasksWorkingOn[i];
            task.peopleAssigned.splice(task.peopleAssigned.indexOf(this), 1);
        }
        this.tasksWorkingOn = [];
    }

    this.work = function (ticksPerHour, time) {
        if (this.tasksWorkingOn.length == 0) return;
        var workPerTask = this.productivityPerHour / this.tasksWorkingOn.length / ticksPerHour;
        this.tasksWorkingOn.forEach(function (task) {
            task.work(workPerTask * (this.productivity[task.column.name] / 100), time, this);
            if (task.finished()) {
                task.unassignPeople();
            }
        }.bind(this));
    }

    this.isAllowedToWorkIn = function (columnName) {
        return this.productivity[columnName] > 0;
    }
} 