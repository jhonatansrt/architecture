import { StorageRepository } from './../storage/storage-repository';
import { IStorageRepository } from 'src/app/domain/storage/i-storage-repository';
import { IAuthRepository } from 'src/app/domain/auth';
import { AuthRepository } from '../auth/auth-repository';

const storageProvider = {
  provide: IStorageRepository,
  useClass: StorageRepository,
};

const authProvider = {
  provide: IAuthRepository,
  useClass: AuthRepository,
};

const commonProviders = [storageProvider, authProvider];

export const providers = [...commonProviders];
