export default (req, res, next) => {
    console.log(req.header("Content-Type"));
    // console.log("passing through checkMarcoPolo");
    next();
}