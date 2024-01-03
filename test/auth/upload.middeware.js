import multer from 'multer'

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads/temp')
    },
    filename:function(req, file, cb){
        const uniqueId = Date.now()
        cb(null, file.fieldname + '-'+ uniqueId)
    }
})

export default multer({storage:storage})