import express from 'express';
import bodyParser from 'body-parser';


const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

var blogPosts = []; 
var blogID = 1;



app.get('/', (req, res) => {
  res.render('index.ejs');
});

app.post('/submit', (req, res) => {
  const { BlogTitle, Author_Name,Content} = req.body;
  blogPosts.push({
    id: blogID++,
    blogTitle: BlogTitle,
    authorName: Author_Name,
    content: Content
  });
  // Here you would typically save the blog post to a database
  console.log("blogTitle:" + BlogTitle, "Content:" + Content, "Author_Name:" + Author_Name);
  res.render('blogs.ejs',{ blogPosts});
});

app.post('/delete/:id', (req, res) => {
  const { blogID } = req.body;  
  blogPosts = blogPosts.filter(post => post.id !== parseInt(blogID));// It can give whole array of blog posts except the one with the given ID
  res.render('blogs.ejs', { blogPosts });
  console.log("Deleted blog post with ID:", blogID);
});

app.get('/edit/:id', (req, res) => {
  const blog = blogPosts.filter(post => post.id !== parseInt(blogID));//get one blog post by ID
  res.render('edit.ejs', { blog });  
});

app.get('/blogs', (req, res) => {
  res.render('blogs.ejs', { blogPosts }); 
});

app.post('/edit', (req, res) => {
  const { BlogTitle, Author_Name,Content} = req.body;
  blogPosts.push({
    id: blogID++,
    blogTitle: BlogTitle,
    authorName: Author_Name,
    content: Content
  });
  // Here you would typically save the blog post to a database
  console.log("blogTitle:" + BlogTitle, "Content:" + Content, "Author_Name:" + Author_Name);
  res.redirect('/blogs');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
