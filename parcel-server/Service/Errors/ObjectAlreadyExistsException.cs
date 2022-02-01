namespace ParcelServer;

public class ObjectAlreadyExistsException : Exception {
    public ObjectAlreadyExistsException(string objectId) : base($"Object {objectId} has already been created")
    {
    }
}