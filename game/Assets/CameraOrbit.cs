using UnityEngine;
using UnityEngine.InputSystem;

public class CameraOrbit : MonoBehaviour
{
    public Transform target;         // assign your globe’s center here
    public float distance = 10f;
    public float speed = 100f;
    public float smooth = 5f;
    private float yaw, pitch;
    private Vector2 lookDelta;

    void Start()
    {
        Vector3 offset = transform.position - target.position;
        distance = offset.magnitude;
        Vector3 dir = offset.normalized;
        pitch = Mathf.Asin(dir.y) * Mathf.Rad2Deg;
        yaw   = Mathf.Atan2(dir.x, dir.z) * Mathf.Rad2Deg;
    }

    void Update()
    {
        if (Mouse.current.rightButton.isPressed)
        {
            lookDelta = Mouse.current.delta.ReadValue();
            yaw   += lookDelta.x * speed * Time.deltaTime;
            pitch -= lookDelta.y * speed * Time.deltaTime;
            pitch = Mathf.Clamp(pitch, -85f, 85f);
        }

        if (Keyboard.current.rKey.wasPressedThisFrame)
            pitch = 0f;

        // smooth interpolation
        float sy = Mathf.LerpAngle(transform.eulerAngles.y, yaw, smooth * Time.deltaTime);
        float sp = Mathf.LerpAngle(transform.eulerAngles.x, pitch, smooth * Time.deltaTime);

        Quaternion rot = Quaternion.Euler(sp, sy, 0);
        Vector3 pos = rot * new Vector3(0, 0, -distance) + target.position;

        transform.rotation = rot;
        transform.position = pos;
    }
}
