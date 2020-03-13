export function pushToObject(snapshot: any) {
	if (!snapshot.exists) return null;
	return { ...snapshot.data(), id: snapshot.id };
}
