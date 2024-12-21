// Wrap function for handling errors asynchronously.
function wrapAsync(fn){
    return function (req,res,next){
        fn(req,res,next).catch(next);
    }
}
export default wrapAsync;
