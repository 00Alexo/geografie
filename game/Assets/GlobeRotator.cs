using UnityEngine;
using UnityEngine.InputSystem;

public class GlobeRotator : MonoBehaviour
{
    [Header("Rotation Settings")]
    public float rotationSpeed = 0.2f;
    public float skyboxRotationSpeed = 0.1f;
    public float smoothSpeed = 5f;

    private PlayerControls controls;
    private Vector2 lookDelta;
    private Quaternion targetRotation;
    private Quaternion currentRotation;

    private void Awake()
    {
        controls = new PlayerControls();
        controls.Globe.Look.performed += ctx => lookDelta = ctx.ReadValue<Vector2>();
        controls.Globe.Look.canceled  += ctx => lookDelta = Vector2.zero;
    }

    private void OnEnable()
    {
        controls.Enable();
    }

    private void OnDisable()
    {
        controls.Disable();
    }

    private void Start()
    {
        targetRotation = currentRotation = transform.rotation;
    }

    private void Update()
    {
        // Reset north-up on R key
        if (Keyboard.current.rKey.wasPressedThisFrame)
        {
            Vector3 e = targetRotation.eulerAngles;
            targetRotation = Quaternion.Euler(0f, e.y, 0f);
        }

        // Right-click drag to rotate
        if (Mouse.current.rightButton.isPressed)
        {
            float yaw   = lookDelta.x * rotationSpeed * Time.deltaTime;
            float pitch = lookDelta.y * rotationSpeed * Time.deltaTime;
            // yaw around world up
            targetRotation = Quaternion.AngleAxis(yaw, Vector3.up) * targetRotation;
            // pitch around local right
            targetRotation = targetRotation * Quaternion.AngleAxis(-pitch, Vector3.right);
        }

        // Smoothly slerp
        currentRotation = Quaternion.Slerp(currentRotation, targetRotation, smoothSpeed * Time.deltaTime);
        transform.rotation = currentRotation;

        // Skybox rotation
        RenderSettings.skybox.SetFloat("_Rotation", currentRotation.eulerAngles.y * skyboxRotationSpeed);
    }
}
