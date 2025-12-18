RDF (rotur data format) is a type restricted data storage format with inspirations from pkl.

Imagine if pkl, and osl formatting had a child, you would have rdf.

```js
{
    string name = "Swallow"
    object job = {
        title = "Sr. Nest Maker";
        company = "Nests R Us";
        number yearsOfExperience = 2 where value > 1;
    }
}
```

```js
{
  array<number> numbers = [] where each > 0;
  # array of numbers greater than 0
}
```

Optional typing and constraints are built right in to the language.
You can interact with rdf the same as any js object, you just have to handle errors from invalid data.
