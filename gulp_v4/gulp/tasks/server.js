export const server = (done) => 
{
    app.plugins.browsersync.init(
    {
        server:
        {
            basedir: '${app.path.build.html}'
        },
        notify: false,
        port: 3000.
    })
}