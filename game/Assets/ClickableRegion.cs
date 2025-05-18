using UnityEngine;
using UnityEngine.InputSystem;
using UnityEngine.SceneManagement;

public class RegionClickHandler : MonoBehaviour
{
    private Camera mainCamera;

    void Start()
    {
        mainCamera = Camera.main;
    }

    void Update()
    {
        if (Mouse.current.leftButton.wasPressedThisFrame)
        {
            Ray ray = mainCamera.ScreenPointToRay(Mouse.current.position.ReadValue());
            if (Physics.Raycast(ray, out RaycastHit hit))
            {
                Debug.Log("Clicked on: " + hit.collider.name);

                if (hit.collider.CompareTag("Europe"))
                {
                    Debug.Log("Europe clicked!");
                    SceneManager.LoadScene("EuropeScene");
                }
            }
        }
    }
}
