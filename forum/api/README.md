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

## Reasoning for Elysia + Bun

- It is 21x times faster than Express, literal no-brainer.
- Elysia is mature enough to compete with Express
- Bun is up to 4x faster than Node.js and its built-in package manager is 7x faster than npm
- Bun was recently acquired by Anthropic (if that matters)
- Elysia was built around type-safety (compared to Next.js for example which had to have type-safety added to it)
- Supports Typebox which is faster than Zod, and also supports Zod which is popular
- Great documentation

## Reasoning for Feature-based folder structure
Even though we are currently planning on doing posts, we may consider doing comments as well in the future, or another feature that is part of the forum.

If you want to delete a feature, you can just delete the entire folder, no need to hunt through a layer-based folder structure.

If you are using external tools like an Auth provider, and want to switch, you only need to go to the services folder and change one file.

