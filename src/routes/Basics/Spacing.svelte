<section class="container-fluid bg-light p-3">
	<h2>LLP-spezifisch: Spacing</h2>
	Spacing = Layout = Verteilung von Elementen innerhalb einer gerenderten Seite
</section>

<div class="container-fluid p-3 bg-white">
	<div class="row gx-3">
		<div class="col-lg-auto">
			<div class="p-3 bg-light">
				Generell bitte Pattern Library Festlegungen beachten:
				<a href="https://wikiblog.charite.de/confluence/pages/viewpage.action?pageId=115692546">
					Gestaltungsraster (Grid)</a
				>
				und
				<a href="https://wikiblog.charite.de/confluence/pages/viewpage.action?pageId=122587448"
					>Abstandssystem (Spacing)</a
				>.
			</div>

			<div class="p-3 bg-light">
				Zum Verhalten einer gerenderten Seite in Abhängigkeit von der größe des Fensters bzw. des
				Anzeigegeräts siehe Foundation Devices.
			</div>

			<div>Erlaubte Spacing-Methoden und ihre Priorisierung:</div>

			<ol class="list-group list-group-numbered">
				<li class="list-group-item">
					Bootstrap5-Layout:
					<a href="https://getbootstrap.com/docs/5.0/layout/breakpoints/"> Breakpoints </a>,
					<a href="https://getbootstrap.com/docs/5.0/layout/containers/"> Containers </a>,
					<a href="https://getbootstrap.com/docs/5.0/layout/grid/"> Grid </a> usw., Vorteil: responsives
					Layout ist einfach.
				</li>
				<li class="list-group-item">
					Bootstrap5-Helpers und -Utilities, z.B. :
					<a href="https://getbootstrap.com/docs/5.0/helpers/position/"> Position </a>,
					<a href="https://getbootstrap.com/docs/5.0/utilities/spacing/"> Spacing </a>,
					<a href="https://getbootstrap.com/docs/5.0/utilities/vertical-align/"> Vertical align </a>
				</li>
				<li class="list-group-item">
					Wenn es nicht zu vermeiden ist, dürfen selbst Größen gesetzt werden. Das betrifft
					Attribute wie z.B. height, width, padding, margin. Die zulässigen Werte sind vielfache der
					Bootstrap5-Variable
					<a href="https://getbootstrap.com/docs/5.0/utilities/spacing/#sass"> $spacer. </a>
				</li>
			</ol>
		</div>
	</div>
</div>
