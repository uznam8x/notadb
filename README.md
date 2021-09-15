# Notadb
Notadb is a shortened for "Not a database".  
This library is you can do duck typing using a set schema.

## Install
```bash
yarn add notadb
```
## How to use
```typescript
import { Model } from 'notadb';

const post = new Model([{ id: 2 }]);
const res = post.find(2);
/* res
{
  id: 2,
  key: "",
  link: "",
  type: "post",
  author: {},
  subject: "",
  description: "",
  thumbnail: "",
  media: [],
  properties: {},
  metadata: [],
  relations: [],
  createdAt: "1977-01-01T00:00:00.0000",
  updatedAt: "1977-01-01T00:00:00.0000",
}
*/

```
## Schema
### Record
| key         | type       | default          | description      |
| ----------- | ---------- | ---------------- | ---------------- |
| id          | number     | -1               | primary key      |
| key         | string     | ""               | hash key         |
| link        | string     | ""               | page link        |
| type        | string     | post             | post type        |
| author      | Author     | {}               | user             |
| subject     | string     | ""               | subject          |
| description | string     | ""               | description      |
| thumbnail   | string     | ""               | image url        |
| media       | Media      | []               | Media type       |
| metadata    | Metadata[] | []               |                  |
| properties  | Properties | {}               |                  |
| relations   | Record[]   | []               | relations record |
| createdAt   | Date       | current datetime | create datetime  |
| updatedAt   | Date       | current datetime | update datetime  |
---
### Author
| key    | type   | default | description |
| ------ | ------ | ------- | ----------- |
| id     | number | -1      | -           |
| name   | string | ""      | -           |
| avatar | string | ""      | image url   |

### Media
| key      | type   | default | description |
| -------- | ------ | ------- | ----------- |
| url      | string | ""      | -           |
| mimetype | string | ""      | -           |

### Metadata
| key   | type   | default | description |
| ----- | ------ | ------- | ----------- |
| label | string | ""      | -           |
| name  | string | ""      | -           |
| value | any    | ""      | -           |

---
### Properties
| key   | type   | default | description |
| ----- | ------ | ------- | ----------- |
| name  | string | ""      | -           |
| value | any    | ""      | -           |
## Model
### Insert
```typescript
const posts = new Model();
posts.insert({ id: 2 });

// or

const posts = new Model([
    {id: 2}
]);

// => Model
```

### Update
```typescript
const posts = new Model([
    { id: 2 }
]);
posts.update(2, { subject: "update" });

// => Model
```

### Destroy
```typescript
const posts = new Model([
    { id: 2 },
    { id: 3 }
]);
posts.destroy(2);
// => Model
```


### all
```typescript
const posts = new Model([
    { id: 2, subject: "a" },
    { id: 3, subject: "b" },
    { id: 4, subject: "b" },
]);
posts.all();
// => Record[] [ { id: 3, subject: "b", ...}, {id: 4, subject: "b", ...} ]

```
### find
```typescript
// find by id
const posts = new Model([
    { id: 2, subject: "a" },
    { id: 3, subject: "b" },
    { id: 4, subject: "b" },
]);
posts.find(2);
// => Record { id: 2, subject: "a", ...}
```
### findBy
```typescript
const posts = new Model([
    { id: 2, subject: "a" },
    { id: 3, subject: "b" },
    { id: 4, subject: "b" },
]);

posts.findBy("subject", "b");
// => Record { id: 3, subject: "b", ...}
```
### findAll
```typescript
const posts = new Model([
    { id: 2, subject: "a" },
    { id: 3, subject: "b" },
    { id: 4, subject: "b" },
]);

posts.findAll("subject", "b");
// => Record[] [ { id: 3, subject: "b", ...}, {id: 4, subject: "b", ...} ]
```

## Record
### Property
If you insert a key, it returns the value of the property.
```typescript
const posts = new Model([
    {
        id: 1,
        subject: "title",
        properties: { like: { label: "like", value: 11 } },
    },
]);

const res = posts.find(1);
res.prop('like');
// => 11
```
### All property
If you don't put in the key, everything will be returned.
```typescript
const posts = new Model([
    {
        id: 1,
        subject: "title",
        properties: {
            like: { label: "like", value: 11 },
            bookmark: { label: "bookmark", value: 12 },
        },
    },
]);

const res = posts.find(1);
const props = res.prop();
// => { like: 11, bookmark: 12 }
```

### Metadata
If you insert a key, it returns the value of the metadata.
```typescript
const posts = new Model([
    {
        id: 1,
        subject: "title",
        metadata: [
            { label: "like", name: "like", value: 12 }
        ],
    },
]);

const res = posts.find(1);
res.meta("like");
// => 12
```


### All metadata
If you don't put in the key, everything will be returned.
> Metadata is good to apply to form.
```typescript
const posts = new Model([
    {
        id: 1,
        subject: "title",
        metadata: [
            { label: "like", name: "like", value: 12 },
            { label: "bookmark", name: "bookmark", value: 13 },
        ],
    },
]);

const res = posts.find(1);
res.meta();
// => [ { name: "like", value: 12 }, { name: "bookmark", value: 13 } ]
```