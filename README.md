# Notadb

Notadb is a shortened for "Not a database".  
This library is you can do duck typing using a set schema.

## Install

```bash
yarn add notadb
```

## How to use

```typescript
import { Model } from "notadb";

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

const posts = new Model([{ id: 2 }]);

// => Model
```

### Update

```typescript
const posts = new Model([{ id: 2 }]);
posts.update(2, { subject: "update" });

// => Model
```

### Destroy

```typescript
const posts = new Model([{ id: 2 }, { id: 3 }]);
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

### head

```typescript
const posts = new Model(
  Array(10)
    .fill(0)
    .map((v, index) => ({
      id: v + index + 1,
      subject: Number(index).toString(16),
    }))
);

posts.head();
// => Record { id: 1, subject: "b", ...}
```

### last

```typescript
const posts = new Model(
  Array(10)
    .fill(0)
    .map((v, index) => ({
      id: v + index + 1,
      subject: Number(index).toString(16),
    }))
);

posts.last();
// => Record { id: 10, subject: "b", ...}
```

### drop

```typescript
const posts = new Model(
  Array(10)
    .fill(0)
    .map((v, index) => ({
      id: v + index + 1,
      subject: Number(index).toString(16),
    }))
);
posts.drop(1); // count
// => Record [{ id: 2, subject: "b", ...}, { id: 3, subject: "b", ...}]
```

## Record

### Get Property

```typescript
const posts = new Model([
  {
    id: 1,
    subject: "title",
    properties: { like: { label: "like", value: 11 } },
  },
]);

const res = posts.find(1);
res.prop("like");
// => 11
```

### Set Property

```typescript
const posts = new Model([
  {
    id: 1,
    subject: "title",
    properties: { like: { label: "like", value: 1 } },
  },
]);

const res = posts.find(1);
res.prop("like", 11);
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

### Get Metadata

```typescript
const posts = new Model([
  {
    id: 1,
    subject: "title",
    metadata: [{ label: "like", name: "like", value: 12 }],
  },
]);

const res = posts.find(1);
res.meta("like");
// => 12
```

### Set Metadata

```typescript
const posts = new Model([
  {
    id: 1,
    subject: "title",
    metadata: [{ label: "like", name: "like", value: 1 }],
  },
]);

const res = posts.find(1);
res.meta("like", 12);
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

## Enumeration

You can enumeration `Metadata[]` or `Property` format

```typescript
const record = new Record({
  id: 1,
  subject: "title",
  // like Metadata[]
  array: [
    { label: "temp", name: "a", value: 1 },
    { label: "temp", name: "b", value: 2 },
  ],

  // like Property
  object: {
    a: { label: "temp", value: 1 },
    b: { label: "temp", value: 2 },
  },
}) as Record & { array: Metadata[]; object: Property };

const metas = record.enum(record.array);
// => { a: 1, b: 2}

const props = record.enum(record.object);
// => { a: 1, b: 2}
```

## Events

```typescript
const posts = new Model([{ id: 2 }]);

posts.on("created", () => {}); // { target: Model }
posts.on("inserted", () => {}); // { record: Object, target: Model }
posts.on("updated", () => {}); // { record: Object, target: Model }
posts.on("destroyed", () => {}); // { record: Object, target: Model }
posts.on("truncated", () => {}); // { }
posts.on("changed", () => {}); // { type: string, target: Model }
```

## Notadb for react

https://www.npmjs.com/package/notadb-react
