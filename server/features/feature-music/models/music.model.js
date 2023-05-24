const Sequelize = require('sequelize')

const modelName = 'Music'
const tableName = 'music_table'

const fields = {
    musicId: {
        type: Sequelize.INTEGER,
        field: 'music_id',
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: Sequelize.STRING,
        // field: 'title',
        allowNull: false,
    },
    lyrics: {
        type: Sequelize.STRING,
        // field:'lyrics',
        allowNull: false,
    },
}


// method: add single music
const handleAddMusic = (conn, Model) => async (args) => {
    // add music query:
    const q = "INSERT INTO music_table(title,lyrics) VALUES(:title,:lyrics)"

    const res = await conn.query(q, {
        replacements: {
            title:args.title,
            lyrics:args.lyrics,
        },
    })
    return res[0]
}

// method: get single music by id
const handleGetMusic = (conn, Model) => async musicId => {
    // query:
    const q = [
        `SELECT music_id, title, lyrics FROM music_table`,
        `WHERE music_id = :musicId`,
    ].filter(i => i !== null).join(' ')

    const res = await conn.query(q, {
        replacements: {
            musicId,
        },
    })

    return res[0]
}

// method: update single music lyrics
const handleUpdateMusicLyrics = (conn, Model) => async (args) => {
    // query:
    const q = [
        `UPDATE music_table`,
        `SET lyrics = :lyrics`,
        `WHERE music_id = :musicId`,
    ].filter(i => i !== null).join(' ')
    const res = await conn.query(q, {
        replacements: {
            lyrics: args.lyrics,
            musicId: args.musicId,
            
        },
    })

    return res[0]
}

// method: update single music title
const handleUpdateMusicTitle = (conn, Model) => async (args) => {
    // query:
    const q = [
        `UPDATE music_table`,
        `SET title = :title`,
        `WHERE music_id = :musicId`,
    ].filter(i => i !== null).join(' ')

    const res = await conn.query(q, {
        replacements: {
            title: args.title,
            musicId: args.musicId,
            
        },
    })

    return res[0]
}

// method: delete single music by id
const handleDeleteMusic = (conn, Model) => async musicId => {
    // delete music query:
    const q = [
        `DELETE FROM music_table`,
        `WHERE music_id = :musicId`,
    ].filter(i => i !== null).join(' ')

    const res = await conn.query(q, {
        replacements: {
            musicId,
        },
    })

    return res[0]
}

// method: get all existing musics
const handleGetMusics = (conn, Model) => async () => {
    // query:
    const q = 'SELECT * FROM music_table'
    const res = await conn.query(q)
    return res[0]
}


const options = {
    tableName,
    freezeTableName: true,
    underscored: true,
    createdAt: false,
    updatedAt: false,
}

const init = (conn) => {
    const Model = conn.define(modelName, fields, options)
    // export the model methods here
    Model.handleAddMusic = handleAddMusic(conn, Model)
    Model.handleGetMusic = handleGetMusic(conn, Model)
    Model.handleUpdateMusicLyrics = handleUpdateMusicLyrics(conn, Model)
    Model.handleUpdateMusicTitle = handleUpdateMusicTitle(conn, Model)
    // Model.handleUpdateMusic = handleUpdateMusic(conn, Model)
    Model.handleDeleteMusic = handleDeleteMusic(conn, Model)
    Model.handleGetMusics = handleGetMusics(conn, Model)
    //Model.handleDeleteMusics = handleDeleteMusics(conn, Model)
    return Model.sync({})
}

module.exports = { name: modelName, init }
