using UnityEngine;

public class CameraOrbit2 : MonoBehaviour
{
    [Header("Target & Distance")]
    public Transform target;           // Centrul globului
    public float distance = 10f;       // Distanța camerei față de target

    [Header("Auto-Rotate")]
    [Tooltip("Viteza de rotație automată în jurul axei Y (grade/sec)")]
    public float autoRotateSpeed = 10f;

    [Header("Smoothing")]
    [Tooltip("Timp de amortizare pentru mișcarea camerei")]
    public float smooth = 5f;

    private float yaw;
    private float pitch;

    void Start()
    {
        // Inițializează yaw/pitch pe baza poziției curente
        Vector3 offset = transform.position - target.position;
        distance = offset.magnitude;
        Vector3 dir = offset.normalized;
        pitch = Mathf.Asin(dir.y) * Mathf.Rad2Deg;
        yaw   = Mathf.Atan2(dir.x, dir.z) * Mathf.Rad2Deg;
    }

    void Update()
    {
        // Rotație automată constantă pe orizontală
        yaw += autoRotateSpeed * Time.deltaTime;

        // Aplică clamp pe pitch dacă vrei să limitezi unghiul vertical
        pitch = Mathf.Clamp(pitch, -85f, 85f);

        // Interpolare lină între unghiurile curente și cele țintă
        float sy = Mathf.LerpAngle(transform.eulerAngles.y, yaw, smooth * Time.deltaTime);
        float sp = Mathf.LerpAngle(transform.eulerAngles.x, pitch, smooth * Time.deltaTime);

        // Construiește rotația și poziția camerei
        Quaternion rot = Quaternion.Euler(sp, sy, 0f);
        Vector3 pos    = rot * new Vector3(0f, 0f, -distance) + target.position;

        transform.rotation = rot;
        transform.position = pos;
    }
}
