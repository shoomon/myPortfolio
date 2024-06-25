module.exports = {
    apps: [
        {
            name: "react-app",
            script: "serve",
            args: "-s build -l 4000",
            env: {
                "PORT": 4000
            }
        }
    ]
}
