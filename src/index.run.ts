import { Database, Repository } from './index';

// create example
const db_video = new Database('video', __dirname)
const Video = new Repository({
  name: 'video',
  columns: [
    { name: 'id', type: 'number', isPrimary: true, autoIncrement: true },
    { name: 'minutes', type: 'number' }
  ],
  db: db_video
})

Video.add([{
  minutes: 10
}])

// find example
const videos = Video.find()
console.log(videos)

// save example
Video.save()