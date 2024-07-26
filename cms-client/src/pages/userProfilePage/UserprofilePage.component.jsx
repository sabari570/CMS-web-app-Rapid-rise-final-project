import React, { useEffect, useState } from "react";
import "./userProfilePage.styles.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";
import UserProfileBody from "../../components/userProfileBody/UserProfileBody.component";
import useFetchUserDetail from "../../hooks/useFetchUserDetail";
import { setIsLoading } from "../../store/loading/loading.reducer";

const UserprofilePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const [userData, setUserData] = useState();
  const { fetchUserDetail } = useFetchUserDetail();

  useEffect(() => {
    if (!currentUser) navigate("/login");
  }, [currentUser]);

  const handleFetchUserData = async () => {
    const userResponse = await fetchUserDetail();
    setUserData(userResponse);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    handleFetchUserData();
  }, []);


  return (
    currentUser && (
      <div className="user-profile">
        <div className="user-profile-wrapper">
          <div className="user-profile-heading">User profile</div>
          {userData && (
            <UserProfileBody userData={userData} setUserData={setUserData} />
          )}
        </div>
      </div>
    )
  );
};

export default UserprofilePage;
