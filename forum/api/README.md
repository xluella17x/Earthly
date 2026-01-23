# Elysia with Bun runtime

## Getting Started
To get started with this template, simply paste this command into your terminal:
```bash
bun create elysia ./elysia-example
```

## Development
To start the development server run:
```bash
bun run dev
```

Open http://localhost:3000/ with your browser to see the result.


## Reasoning for using DAL architecture

Inline logic (db.insert) directly in API rouote was fast to write, with less files.

But if I need to create a post in 2 different places, I will have to copy and paste code.

DAL uses resuable functions (insertPost, updatePost, etc.) and exports it so it can be used in multiple places without having to copy and paste. This is also good because if logic needs to change, I can just do it in one place. 

Also, deleting posts don't actually db.delete(), they just update some of the information to "Deleted User" etc. (like what Reddit does) which is good practice industry-wise.

DAL also makes app faster (less important now than the above advantages) because it makes the API router check cache before talking to database.

Places where queries would have been copy and pasted multiple times for the posts route include:

- getting posts by a user, and posts for the feed.
- getting a single post. "Attending" is only for posts that are events, so first need to check its type by fetching the post. So this would use the fetch post function. 

