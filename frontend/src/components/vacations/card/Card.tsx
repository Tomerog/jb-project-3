import { useContext, useState } from "react";
import { Card, CardContent, CardMedia, Typography, Button, CardActions } from "@mui/material";
import Vacation from "../../../models/vacation/Vacation";
import { AuthContext } from "../../auth/auth/Auth";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../redux/hooks";
import VacationsService from "../../../services/auth-aware/Vacations";
import useService from "../../../hooks/useService";
import { followVacation, removeVacation, unfollowVacation } from "../../../redux/vacationSlice";
import FollowService from "../../../services/auth-aware/Follows";
import Loading from "../../common/loading/Loading";
import "./Card.css"; // Import the CSS file

interface CardProps {
  vacation: Vacation;
}

export default function VacationCard({ vacation }: CardProps): JSX.Element {
  const { user } = useContext(AuthContext)!;
  const isAdmin = user?.isAdmin;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const vacationsService = useService(VacationsService);
  const followService = useService(FollowService);

  const { id, destination, description, vacationStart, vacationEnd, price, imageUrl, followers = [] } = vacation;

  function editVacation() {
    navigate(`/admin/edit/${id}`);
  }

  async function deleteVacation() {
    try {
      if (confirm(`Are you sure you want to delete this vacation to ${destination}?`)) {
        await vacationsService.removeVacation(id);
        dispatch(removeVacation({ id }));
      }
    } catch (e) {
      alert(e);
    }
  }

  const isFollowing = user && followers.some((follower) => follower.id === user.id);
  const [isFollowLoading, setIsFollowLoading] = useState(false);

  async function toggleFollow() {
    if (!user) return;
    try {
      setIsFollowLoading(true);
      if (isFollowing) {
        await followService.unfollow(id);
        dispatch(unfollowVacation({ vacationId: id, user }));
      } else {
        await followService.follow(id);
        dispatch(followVacation({ vacationId: id, user }));
      }
    } catch (e) {
      console.error("Follow action failed:", e);
      alert("Failed to update follow status. Please try again.");
    } finally {
      setIsFollowLoading(false);
    }
  }

  return (
    <Card className="card">
      <CardMedia
        component="img"
        className="card-media"
        image={imageUrl}
        alt={destination}
      />
      <CardContent className="card-content">
        <Typography variant="h5" component="div">
          {destination}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          From: {new Date(vacationStart).toLocaleDateString()} - To: {new Date(vacationEnd).toLocaleDateString()}
        </Typography>
        <div className="card-description">
          <Typography variant="body2">{description}</Typography>
        </div>
        <Typography variant="h6" color="primary" className="card-price">
          ${price}
        </Typography>
      </CardContent>
      <CardActions className="card-actions">
        {isAdmin ? (
          <>
            <Button size="small" color="primary" className="card-button" onClick={editVacation}>
              Edit
            </Button>
            <Button size="small" color="error" className="card-button" onClick={deleteVacation}>
              Delete
            </Button>
          </>
        ) : (
          <>
            <div className="follow-button-wrapper">
              <Button
                size="small"
                variant={isFollowing ? "outlined" : "contained"}
                color={isFollowing ? "secondary" : "primary"}
                className="card-follow-button"
                onClick={toggleFollow}
                disabled={isFollowLoading}
              >
                {isFollowing ? "Unfollow" : "Follow"}
              </Button>
              {isFollowLoading && <span className="loading-spinner"><Loading /></span>}
            </div>
            {!isFollowLoading && <Typography className="card-follower-count">{followers.length} Followers</Typography>}
          </>
        )}
      </CardActions>

    </Card>
  );
}
