import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { IDish } from 'src/app/interfaces/dish/dish.interface';

import firebase from 'firebase/app';


@Injectable({
  providedIn: 'root'
})
export class DishService {
  private dishCollection: AngularFirestoreCollection<IDish>;

  constructor(
    private http: HttpClient,
    private angularFireAuth: AngularFireAuth,
    private angularFirestore: AngularFirestore,
    private angularFireStorage: AngularFireStorage,
  ) {
    this.dishCollection = angularFirestore.collection<IDish>('dishes');
  }

  /**
     * Obtiene los maestros registrados en firebase
     */
  getDishesFirebase(): Observable<IDish[]> {
    return this.dishCollection.valueChanges({ idField: '_id' });
  }

  getDishById(id: string): Observable<firebase.firestore.DocumentSnapshot<IDish>> {
    return this.dishCollection.doc(id).get();
  }

  updateDish(id: string, dish: IDish): Promise<void> {
    return this.dishCollection.doc(id).update(dish);
  }

  addDish(dish: IDish): Promise<DocumentReference<IDish>> {
    return this.dishCollection.add(dish);
  }

  deleteDishById(id: string): Promise<void> {
    return this.dishCollection.doc(id).delete();
  }
  
  async uploadFile(path: string, data: any): Promise<any> {
    await this.angularFireStorage.upload(path, data); // (profile/my-file.png , archivo)
    return await this.angularFireStorage.ref(path).getDownloadURL().toPromise();
  }
}