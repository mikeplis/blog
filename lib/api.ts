import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'
import PostType from '../types/post'

const postsDirectory = join(process.cwd(), '_posts')

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory)
}

/**
 * TODO: I'd like for this to be more typesafe. Not sure if that logic
 * goes here or somewhere else, but a lot of it flows through here.
 *
 * Mainly, I want to enforce that posts have certain frontmatter.
 * Our Post type says all fields are required, but we don't get
 * any TS or build errors if we omit those fields from the frontmatter.
 *
 * Can we be more typesafe here? The fields param here is a small
 * optimization, but we can probaby do without it if it helps us get
 * the type safety we want.
 *
 * I think the main problem is that gray-matter just returns our data
 * as a generic object. Maybe we can create a wrapper around it that
 * enforces the types better?
 *
 *
 * Tried using typescript-json-validator to generate a validator from the types
 * but it didn't work well. The simplest option will probably be to create a
 * validator (with an external lib like joi or manually) and manually keep
 * is in sync with the types
 */
export function getPostBySlug(slug: string, fields: (keyof PostType)[]) {
  const realSlug = slug.replace(/\.md$/, '')
  const fullPath = join(postsDirectory, `${realSlug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  console.log(JSON.stringify(data, null, 2))

  type Items = {
    [key: string]: string
  }

  const items: Items = {}

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = realSlug
    }
    if (field === 'content') {
      items[field] = content
    }

    if (data[field]) {
      items[field] = data[field]
    }
  })

  return items
}

export function getAllPosts(fields: (keyof PostType)[] = []) {
  const slugs = getPostSlugs()
  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1))
  return posts
}
