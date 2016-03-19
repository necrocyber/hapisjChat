var config = {
    mongo: {
        "url": process.env.MONGOLAB_URI || "mongodb://admin:12345@localhost:27017/todo",
        "settings": {
            "db": {
                "native_parser": false
            }
        }
    }
};

module.exports = config;
