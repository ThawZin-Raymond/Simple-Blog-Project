import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;
app.use(express.static("public"));
const submissions = [];

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render("home.ejs", { submissions: submissions });
});

app.get('/post', (req, res) => {
    res.render("post.ejs");
})

app.get('/about', (req, res) => {
    res.render("about.ejs");
})

app.post("/submit-post", (req, res) => {
    let { title, content } = req.body;

    // Trim the title and content
    title = title.trim();
    content = content.trim();

    if (!title || !content) {
        // If title or content is empty after trimming, send an error response
        // or redirect back to the form with an error message
        res.render('post.ejs', { error: 'Title and content cannot be empty.' });
        return;
    }

    // If validation passes, proceed with adding the submission
    submissions.unshift({ title, content });
    res.redirect('/');
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});