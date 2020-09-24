var Todo = Backbone.Model.extend({});
// We can then create our own concrete instance of a (Todo) model 
// with no values at all:
var todo1 = new Todo({
    title: 'demo', completed: true
});
// Following logs: {}
console.log(JSON.stringify(todo1));
// or with some arbitrary data:
var todo2 = new Todo({
    title: 'Check the attributes of both model instances in the console.', completed: true
});
// Following logs: {"title":"Check the attributes of both model // instances in the console.","completed":true} 
console.log(JSON.stringify(todo2));
console.log("heyyyyyyyyy");

var object = {};
_.extend(object, Backbone.Events);
object.on("alert", function (msg) { alert("Triggered " + msg); });
object.trigger("alert", "an event");