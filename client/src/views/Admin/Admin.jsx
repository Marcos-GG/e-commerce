import { useEffect } from "react";
import Comments from "../../components/Comments";
import { useDispatch, useSelector } from "react-redux";
import { ALL_COMMENTS } from "../../Redux/actionsTypes/CommentsTypes";
import { allComments } from "../../Redux/actions/CommentsAction";

const Admin = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const persistedData = localStorage.getItem("persist:root");
    if (persistedData) {
      const parsedData = JSON.parse(persistedData);

      const localComments =
        parsedData.comments && JSON.parse(parsedData.comments).comments;

      if (localComments || localComments.length > 0) {
        dispatch({ type: ALL_COMMENTS, payload: localComments });
      } else {
        dispatch(allComments());
      }
    } else {
      dispatch(allComments());
    }
  }, [dispatch]);

  const comments = useSelector((state) => state.comments.comments);

  return (
    <>
      <h1>Panel del admin</h1>

      <div> {<Comments comments={comments} />} </div>
    </>
  );
};

export default Admin;
