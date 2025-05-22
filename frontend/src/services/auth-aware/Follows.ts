import AuthAware from "./AuthAware";

export default class FollowService extends AuthAware {
  async follow(vacationId: string): Promise<boolean> {
    const response = await this.axiosInstance.post<boolean>(
      `${import.meta.env.VITE_REST_SERVER_URL}/follows/follow/${vacationId}`
    );
    return response.data;
  }

  async unfollow(vacationId: string): Promise<boolean> {
    const response = await this.axiosInstance.delete<boolean>(
      `${import.meta.env.VITE_REST_SERVER_URL}/follows/unfollow/${vacationId}`
    );
    return response.data;
  }
}
