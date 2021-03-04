const Joi = require('joi');  //Joi package is for validation need to include schema
const express = require('express');   //require to load the express module
const app = express();  //express() is a object here

app.use(express.json());  //return piece of middleware

const courses = [
    { id:1, name: 'course1'},
    { id:2, name: 'course2'},
    { id:3, name: 'course3'},
];

app.get('/', (req, res) => {        //in get() pass 2 arguments 1st url, 2nd function 
res.send('Hello World!!!')
});

app.get('/api/courses', (req, res) => {
res.send(courses);
});

//POST
app.post('/api/courses', (req, res) => {
const schema = Joi.object({
    name: Joi.string().min(3).required()
});
  
const result = schema.validate(req.body);    //follow this way code else it will show joi validate is not a function
    if (result.error){
        res.status(400).send(result.error.details[0].message)  //after adding this detail part will get proper error message
        return;
    }
    const course = {
    id: courses.length + 1,
    name: req.body.name    //to make it enable need json file to exported above
    };
    courses.push(course);
    res.send(course);
});

//PUT
app.put('/api/courses/:id', (req,res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));   //look up the courses
    if(!course) return res.status(404).send('The course with the given Id was not found...'); //if invalid return error

   //const result = validateCourse(req.body);     as we made object destructuring we dont need this line
//    const { error } = validateCourse(req.body);       //object destructuring(equivalent to result.error)
//     if ( error ){                                         //if invalid return error
//         res.status(400).send(result.error.details[0].message)  //after adding this detail part will get proper error message
//         return;
//     }

const schema = Joi.object({
    name: Joi.string().min(3).required()
});
  
const result = schema.validate(req.body);    
    if (result.error){
        res.status(400).send(result.error.details[0].message)  
        return;
    }

    course.name = req.body.name;   //update course
    res.send(course);
});


 app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) res.status(404).send('The course with the given Id was not found...');
     res.send(course);
 });


// function validateCourse(course) {
//     const schema = Joi.object({                                      //validate
//         name: Joi.string().min(3).required()                         
//     });                                               //this is a seperate schema function we made to use it easily
      
//     return schema.validate(course, schema);  
// }


//DELETE
app.delete('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));   //look up the courses
    if(!course) return res.status(404).send('The course with the given Id was not found...'); //if invalid return error
   
    const index = courses.indexOf(course);   //delete
    courses.splice(index, 1);

    res.send(course);                     //return the same course

});

//PORT
const port = process.env.PORT || 3000;   //procss-variable, env- envirnment, Port-varible
app.listen(port, () => console.log(`Listening on port ${port}... `))   //for 3000 port
//app.listen(3000, () => console.log('Listening on port 3000...'))
