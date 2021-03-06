import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable, Observer, Subject } from 'rxjs';
import { IUser } from 'src/app/interfaces/user/user.interface';
import { environment } from 'src/environments/environment';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import 'firebase/firestore';


@Injectable({
  providedIn: 'root'
})


//Hacemos el arreglo de usuarios hardcodeados
export class UserService {
  users: IUser[] = [
    {
      _id: "1",
      email: 'omar.salas@jynsystems.com',
      password: '123',
    },
    {
      _id: "2",
      email: 'andres@jynsystems.com',
      password: '123',
    },
  ]

  private usersCollection: AngularFirestoreCollection<IUser>;

  constructor(
    // Para usar la clase HttpClient hay que agregar en el módulo el módulo de esta clase
    private http: HttpClient,
    private angularFireAuth: AngularFireAuth,  //Google 
    private angularFirestore: AngularFirestore, //Hacer las conexiones al almacenamiento
    private angularFireStorage: AngularFireStorage, //Almacenamiento
  ) {
    this.usersCollection = angularFirestore.collection<IUser>('users', ref =>
      ref.orderBy('email', "asc"));
  }

  //Obtener todos los usuarios
  getUsersFirebase(): Observable<IUser[]> {

    return this.usersCollection.valueChanges({ idField: '_id' });

  }

  getUserById(id: string): Observable<firebase.firestore.DocumentSnapshot<IUser>> {
    return this.usersCollection.doc(id).get();
  }

  updateUser(id: string, user: IUser): Promise<void> {
    return this.usersCollection.doc(id).update(user);
  }

  addUser(user: IUser): Promise<DocumentReference<IUser>> {
    this.angularFireAuth.createUserWithEmailAndPassword(user.email, user.password);
    return this.usersCollection.add(user);
  }

  deleteUserById(id: string): Promise<void> {
    return this.usersCollection.doc(id).delete();
  }
  /**
   * Inicio de sesión con Email y password en firebase
   * @param email email
   * @param password password
   */
  login(email: string, password: string): Promise<any> {
    return this.angularFireAuth.signInWithEmailAndPassword(email, password);
  }

  loginWithGoogle(): Promise<firebase.auth.UserCredential> {
    return this.angularFireAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }
}

