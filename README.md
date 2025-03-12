RDF (rotur data format) is a type restricted data storage format with inspirations from pkl.

Imagine if pkl, and osl formatting had a child, you would have rdf.

```js
{
    string name = "Swallow"
    object job = {
        title = "Sr. Nest Maker";
        company = "Nests R Us";
        number(self > 1) yearsOfExperience = 2
    }
}
```

```js
{
  array<number> (self > 0) numbers = []
  # array of numbers greater than 0
}
```

Optional typing and constraints built right in to the language will allowing you to interact with it through a simple js dot notations.
