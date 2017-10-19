import { Profile } from './profile.model';

export class ProfileService {
  private profiles: Profile[] = [
    new Profile('defaultProfile', ['Prague', 'Brno', 'Ostrava'])
  ];

  saveNewProfile(cities: string[]) {
    const profileName = 'Profile ' + this.profiles.length;
    const profile = new Profile(profileName, cities);
    this.profiles.push(profile);
  }

  getProfiles() {
    return this.profiles;
  }

  deleteProfile(profile: Profile) {
    const index = this.profiles.indexOf(profile);
    this.profiles.splice(index, 1);
  }
}
