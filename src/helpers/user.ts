export function toFirebaseUser(googleUser) {
    return {
        id: googleUser.uid,
        email: googleUser.providerData[0].email,
        displayName: googleUser.providerData[0].displayName,
        fullDisplayName: (googleUser.providerData[0].displayName + ' (' + googleUser.providerData[0].email + ')'),
        fullName: (googleUser.providerData[0].displayName + ' (' + googleUser.providerData[0].email + ')').toLowerCase(),
        photoURL: googleUser.providerData[0].photoURL,
    }
}