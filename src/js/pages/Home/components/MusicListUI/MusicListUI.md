### MusicListUI styleguide component

```js
<MusicListUI
    data={[
        {
            music_id: 1,
            title: 'Wake up',
            lyrics:'la la la...'
        },
        {
            music_id: 2,
            title: 'Brush teeth',
            lyrics:'la la la...'
        },
        {
            music_id: 3,
            title: 'Drink water',
            lyrics:'la la la...'
        },
        {
            music_id: 6,
            title: 'Drink tea',
            lyrics:'la la la...'
        },
    ]}
    onOpen={(musicId) => console.log('open music details', musicId)}
/>
```
