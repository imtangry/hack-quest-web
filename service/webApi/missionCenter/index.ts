import WebService from '@/service/webService/webService';
import { UserLevelType, BadgesType, MissionDataType } from './type';

export enum MissionCenterApiType {
  GetUserLevel = '/users/level',
  GetAllBadges = '/badges',
  Missions = '/missions'
}

class MissionCenterApi {
  protected service: WebService;
  constructor(service: WebService) {
    this.service = service;
  }
  /** 获取用户等级 */
  getUserLevel() {
    return this.service.get<UserLevelType>(MissionCenterApiType.GetUserLevel);
  }
  /** 获取所有badge */
  getAllBadges() {
    return this.service.get<BadgesType[]>(MissionCenterApiType.GetAllBadges);
  }
  /** 获取所有mission */
  getAllMission() {
    return this.service.get<MissionDataType[]>(MissionCenterApiType.Missions);
  }
  /** mission claim */
  missionClaim(missionId: string) {
    const url = `${MissionCenterApiType.Missions}/${missionId}/claim`;
    return this.service.get(url);
  }
}

export default MissionCenterApi;