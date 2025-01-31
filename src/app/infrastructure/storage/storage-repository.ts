import {
  IStorageRepository,
  ObjectType,
  Key,
  StoredObject,
} from 'src/app/domain/storage/i-storage-repository';
import { Preferences } from '@capacitor/preferences';

export class StorageRepository implements IStorageRepository {
  public async getStorage<T extends Key>(
    key: T
  ): Promise<ObjectType<T> | null> {
    const result = await Preferences.get({ key });

    if (!result.value) {
      return null;
    }

    const parsedObject: StoredObject<T> = JSON.parse(result.value);
    return parsedObject.object;
  }

  public async setStorage<T extends Key>(
    key: T,
    data: ObjectType<T>
  ): Promise<void> {
    const storedObject: StoredObject<T> = {
      updatedDate: new Date(),
      object: data,
    };
    await Preferences.set({ key, value: JSON.stringify(storedObject) });
  }

  public async deleteFromStorage(key: Key) {
    await Preferences.remove({ key });
  }

  public async clearAll(): Promise<void> {
    await Preferences.clear();
  }
}
