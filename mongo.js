
db.movies.insert({ 'title': 'Star Wars', 'writer':'George Lucas','year':1977,'actors':['Mark Hamill','Harrison Ford','Carrie Fisher','Peter Chushing','James Earl Jones' ] })

db.movies.insert({'title':'Raiders of the Lost Ark','writer':'George Lucas','year':1981,'actors':['Harrison Ford']})

db.movies.insert({'title':'Fight Club','writer':'Chuck Palahniuk','year':1999,'actors':['Brad Pitt','Edward Norton']})

db.movies.insert({'title' : 'Pulp Fiction', 'writer' : 'Quentin Tarantino','year' : 1994, 'actors' : ['John Travolta','Uma Thurman','Samuel L. Jackson']})

db.movies.insert({'title':'Inglorious Basterds','writer':'Quentin Tarantino','year':2009,'actors':['Brad Pitt','Diane Kruger','Eli Roth']})

db.movies.insert({'title':'The Hobbit: An Unexpected Journey','writer':'J.R.R. Tolkein', 'year':2012,'franchise':'The Hobbit'})

db.movies.insert({'title':'The Hobbit: The Desolation of Smaug', 'writer':'J.R.R. Tolkein','year':2013,'franchise':'The Hobbit'})

db.movies.insert({'title':'The Hobbit: The Battle of the Five Armies', 'writer':'J.R.R. Tolkein','year':2012,'franchise':'The Hobbit', 'synopsis' : 'Bilbo and Company are forced to engage in a war against an array of combatants and keep the Lonely Mountain from falling into the hands of a rising darkness.'})

db.movies.insert({'title' : "Pee Wee Herman's Big Adventure",'writer': 'Phil Hartman','year': 1985})

db.movies.insert({'title': 'Avatar'})

//find all movies in movies collection in database
db.movies.find({})
//get all documents with writer set to 'Quentin Tarantino'
db.movies.find({'writer':'Quentin Tarantino'})
//get all documents where actors include "Brad Pitt"
db.movies.find({'actors':'Brad Pitt'})
//get all documents with franchise set to "The Hobbit"
db.movies.find({'franchise':'The Hobbit'})
//get all movies released in the 90s
db.movies.find({'year':{$lt:2000}})
//find all movies released before 2000 or after 2010
db.movies.find( { $or: [ { 'year': { $lt: 2000 } }, { 'year': {$gt:2010} } ] } )
//add synopsis to The Hobbit: An Unexpected Journey
db.movies.updateOne({ "title": "The Hobbit: An Unexpected Journey" },{ $set: { "synopsis": "A reluctant hobbit, Bilbo Baggins, sets out to the Lonely Mountain with a spirited group of dwarves to reclaim their mountain home - and the gold within it - from the dragon Smaug."} })
//add synopsis to The Hobbit: The Desolation of Smaug
db.movies.updateOne({ "title": "The Hobbit: The Desolation of Smaug" },{ $set: { "synopsis": "The dwarves, along with Bilbo Baggins and Gandalf the Grey, continue their quest to reclaim Erebor, their homeland, from Smaug. Bilbo Baggins is in possession of a mysterious and magical ring."} })
//add an actor named "Samuel L Jackson" to the movie "Pulp Fiction"
db.movies.updateOne({ "title": "Pulp Fiction"},{ $set: {'actors' : ['John Travolta','Uma Thurman','Samuel L. Jackson']}})
//creates searchable text index in synopsis field of movies collection
db.movies.createIndex( { 'synopsis': "text" } )
//find all movies that have Bilbo in the synopsis
db.movies.find( { $text: { $search: "Bilbo" } } )
//find all movies that have Gandalf in the synopsis
db.movies.find( { $text: { $search: "Gandalf" } } )
//find all movies w synopsis that contains Bilbo but not Gandalf
db.movies.find( { $text: { $search: "Bilbo -Gandalf" } } )
//find all movies w synopsis that contains dwarves or hobbit
db.movies.find( { $text: { $search: "dwarves hobbit" } } )
//find all movies w synopsis that contains gold and dragon
db.movies.find( { $text: { $search: "gold +dragon" } } )
//delete the movie peewee hermans big adventure
db.movies.deleteOne({ "title": "Pee Wee Herman's Big Adventure" })
//delete Avatar
db.movies.deleteOne({ "title": "Avatar" })

//insert relationship info
db.users.insert([
    {
        username: "SallySmith",
        first_name: "Sally",
        last_name: "Smith"
    },
    {
        username: "JimmyHagen",
        full_name: {
            first: "Jimmy",
            last: "Hagen",
        }
    }
])


db.posts.insert([
	{
		_id: 1,
		username : "SallySmith",
		title : "Passes out at party",
		body : "Wakes up early and cleans house",
	},

	{
		_id: 2,
		username : "SallySmith",
		title : "Buys a House",
		body : "Living in a new neighborhood now",
	},

	{
		_id: 3,
		username : "SallySmith",
		title : "Reports a bug in your code",
		body : "Sends you a Pull Request",
	},

	{
		_id: 4,
		username : "JimmyHagen",
		title : "Borrows something",
		body : "Returns it when he is done",
	},

	{
		_id: 5,
		username : "JimmyHagen",
		title : "Borrows everything",
		body : "The end",
	},

	{
		_id: 6,
		username : "JimmyHagen",
		title : "Forks your repo on github",
		body : "Sets to private",
	},
])

db.comments.insert([
	{
		username : "SallySmith",
		comment : "Hope you got a good deal!",
		post : 4,
	},
	{
		username : "SallySmith",
		comment : "What's mine is yours!",
		post : 5,
	},
	{
		username : "SallySmith",
		comment : "Don't violate the licensing agreement!",
		post : 6,
	},
	{
		username : "JimmyHagen",
		comment : "It still isn't clean",
		post : 1,
	},
	{
		username : "JimmyHagen",
		comment : "Denied your PR cause I found a hack",
		post : 3
	},
])
//find all users
db.users.find({}).pretty()
//find all posts
db.posts.find({}).pretty()
//find all posts from SallySmith
db.posts.find({username: "SallySmith"}).pretty()
//find all posts from JimmyHagen
db.posts.find({username: "JimmyHagen"}).pretty()
//find all comments
db.comments.find({}).pretty()
//find all comments by SallySmith
db.comments.find({username: "SallySmith"}).pretty()
//find all comments by JimmyHagen
db.comments.find({username: "JimmyHagen"}).pretty()
//find comments belonging to the post 'reports a bug in your code'
db.comments.find({post: db.posts.findOne({title: "Reports a bug in your code"})._id})