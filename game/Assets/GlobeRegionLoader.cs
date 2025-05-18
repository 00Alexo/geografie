using UnityEngine;
using UnityEngine.InputSystem;

public class GlobeContinentClicker : MonoBehaviour
{
    public MeshCollider globeCollider;
    public Camera mainCamera;

    private CloudFadeOnLoad fadeManager;

    void Start()
    {
        fadeManager = FindObjectOfType<CloudFadeOnLoad>();
        if (fadeManager == null)
        {
            Debug.LogError("CloudFadeOnLoad not found in scene.");
        }
    }

    void Update()
    {
        if (!Mouse.current.leftButton.wasPressedThisFrame) return;

        var ray = mainCamera.ScreenPointToRay(Mouse.current.position.ReadValue());
        if (Physics.Raycast(ray, out var hit) && hit.collider == globeCollider)
        {
            // Convert the hit.point into the globe's local space:
            Vector3 localHit = globeCollider.transform.InverseTransformPoint(hit.point);
            Vector3 localDir = localHit.normalized;

            // Compute latitude & longitude in the globe's own orientation:
            float lat = Mathf.Asin(localDir.y) * Mathf.Rad2Deg;
            float lon = Mathf.Atan2(localDir.z, localDir.x) * Mathf.Rad2Deg;
            if (lon > 180f) lon -= 360f;
            if (lon < -180f) lon += 360f;

            Debug.Log($"Clicked lat: {lat:F1}, lon: {lon:F1}");

            string continent = GetContinent(lat, lon);
            Debug.Log("You clicked on: " + continent);

            // Only fade and load if a known region was clicked
            if (continent != "Unknown region")
            {
                string sceneName = continent + "Scene"; // e.g., "EuropeScene"
                fadeManager?.FadeAndLoad(sceneName);
            }
        }
    }

    string GetContinent(float lat, float lon)
    {
        if (lat <= -60f) return "Antarctica";
        if (lat <= 0f && lat >= -50f && lon >= 110f && lon <= 180f) return "Australia";
        if (lat <= 15f && lat >= -60f && lon <= -34f && lon >= -82f) return "SouthAmerica";
        if (lat >= 15f && lat <= 85f && lon >= -170f && lon <= -50f) return "NorthAmerica";
        if (lat >= 35f && lat <= 71f && lon >= -10f && lon <= 40f) return "Europe";
        if (lat <= 35f && lat >= -35f && lon >= -17f && lon <= 51f) return "Africa";
        if (lon >= 40f && lon <= 180f && lat >= -10f && lat <= 80f) return "Asia";
        return "Unknown region";
    }
} 