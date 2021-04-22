<?php include 'header.php'; ?>

<div id="main-loader">
    <div class="spinner-border text-primary" style="width: 3rem; height: 3rem;" role="status">
        <span class="visually-hidden"></span>
    </div>
</div>

<nav id="navbar" class="navbar navbar-expand-md navbar-light fixed-top bg-light shadow-sm">
    <div class="container-fluid">
        <a class="navbar-brand"></a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarCollapse">
            <ul class="navbar-nav me-auto mb-2 mb-md-0">
                <li class="nav-item">
                    <a id="logout-link" class="nav-link" href="<?php echo URL; ?>logout.php"></a>
                </li>
                <li class="nav-item">
                    <a id="dark-link" class="nav-link"></a>
                </li>
                <li class="nav-item">
                    <a id="participant-link" class="nav-link"></a>
                </li>
                <li class="nav-item">
                    <a id="meeting-link" class="nav-link"></a>
                </li>
                <li class="nav-item">
                    <a id="snap-link" class="nav-link"></a>
                </li>
                <li id="lang-list" class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" id="dropdown02" data-bs-toggle="dropdown" aria-expanded="false">Dropdown</a>
                    <ul class="dropdown-menu" aria-labelledby="dropdown02">
                    </ul>
                </li>
            </ul>
            <div class="d-flex">
                <div id="server-list" class="dropdown me-2 d-none">
                    <a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                        Dropdown link
                    </a>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                        <li><a class="dropdown-item" href="#">Action</a></li>
                    </ul>
                </div>
                <div class="input-group">
                    <div class="input-group-text"><i class="fas fa-stopwatch"></i></div>
                    <input id="delay-inp" class="form-control me-2" type="number" min="10" max="300" size="3" aria-label="nmber">
                </div>
                <button id="delay-btn" class="btn btn-outline-success" type="submit"><i class="fas fa-play"></i></button>
            </div>
        </div>
    </div>
</nav>

<main class="container-fluid">

</main>

<?php include 'footer.php'; ?>