import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { fetchProfile } from "../redux/slices/authSlice";

const useProfile = () => {
  const dispatch = useAppDispatch();
  const profileData = useAppSelector((state) => state.auth.profileData);
  const loading = useAppSelector((state) => state.auth.loading);

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  return { profileData, loading };
};

export default useProfile;
